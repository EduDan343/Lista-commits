import {
    ArgumentMetadata,
    Injectable,
    PipeTransform,
    BadRequestException
} from '@nestjs/common';

//utilizarlo en algun controller para validar params que lleguen
@Injectable()
export class ParseIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        const valor = parseInt(value, 10);
        if (isNaN(valor)) {
            throw new BadRequestException(`${value} is not an number`)
        }
        return valor;
    }
}
