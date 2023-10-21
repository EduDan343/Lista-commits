import { Module, Global } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import axios from 'axios';


@Global()
@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        {
            provide: 'ApiGit',
            useFactory: async (http: HttpService) => {
                const apiGitResponse = await axios({
                    method: 'GET',
                    url: 'https://api.github.com/repos/EduDan343/Agenda-telefonica/commits',
                    headers: {
                        Authorization: 'Bearer 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'
                    }
                })
                console.log({ apiResponse: apiGitResponse.data })
                return apiGitResponse.data;
            },
            inject: [HttpService],
        }
    ],
    exports: ['ApiGit']
})

export class CommitsModule { }