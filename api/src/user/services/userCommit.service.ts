import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { UserCommits } from '../entities/userCommits.entity';
import { ReadCommitsDto, UpdateCommitDto } from '../dtos/userCommits.dtos';

@Injectable()
export class UserCommitService {
    constructor(
        @Inject('ApiGit') private apiGit: any
    ) { }

    findAllCommits() {
        return this.apiGit;
    }
}