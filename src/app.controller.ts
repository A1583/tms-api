import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Post as PostModel, User as UserModel } from '@prisma/client';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { FlashResponseDto } from './logistics/flash/dto/flashResponse.dto';
import { FlashService } from './logistics/flash/flash.service';

import { PostService } from './post/post.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly logisticsService: FlashService
  ) {}

  @Get()
  async getHello(){
    return this.logisticsService.getTrackingData("TH62013SHJ7D7L")
    // console.log("result: ", result);
    
    // return result;
  }

  @Post('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.post({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.posts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.posts({
      where: {
        OR: [
          { title: { contains: searchString } },
          { content: { contains: searchString } },
        ],
      },
    });
  }

  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.postService.createPost({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.postService.updatePost({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('') id: string): Promise<PostModel> {
    return this.postService.deletePost({ id: Number(id) });
  }
}
