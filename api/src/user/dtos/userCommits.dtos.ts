import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
    IsDate
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class ReadCommitsDto {
    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;


    @IsNotEmpty()
    @IsDate()
    readonly date: Date;

    @IsUrl()
    @IsNotEmpty()
    readonly url: string;

    @IsString()
    @IsNotEmpty()
    readonly branch: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    readonly totalCommits: number;
}

export class UpdateCommitDto extends PartialType(ReadCommitsDto) { }