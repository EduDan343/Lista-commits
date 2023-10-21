import { Module } from '@nestjs/common';
import { UserCommitsController } from './controllers/userCommits.controller';
import { UserCommitService } from './services/userCommit.service';

@Module({
    imports: [],
    controllers: [UserCommitsController],
    providers: [UserCommitService]
})
export class UserModule { }