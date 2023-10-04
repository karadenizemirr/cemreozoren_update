import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'path';
import fastyfyMultipart from '@fastify/multipart';
import secureSession from '@fastify/secure-session';
import compression from '@fastify/compress'
import Handlebars from 'handlebars';
import { ErrorService } from './customService/error.service';
import fastifyCsrf from '@fastify/csrf-protection';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'src/assets/public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'src/assets/views'),
    layout: 'partials/layout'
  });

  Handlebars.registerHelper('eq', function (a, b, options) {
    if (a === b) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('selected', function (a: any, b: any, options) {
    if (a == b) {
      return 'selected'
    }

    return ''
  })

  Handlebars.registerHelper('datetime', function (date) {
    // Tarih nesnesini oluştur
    var formattedDate = new Date(date);

    // Biçimlendirme seçenekleri
    var options: any = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: 'Europe/Istanbul'
    };

    // Tarihi biçimlendir
    var formattedDateTime = formattedDate.toLocaleString('tr-TR', options);

    // Biçimlendirilmiş tarih ve saat değerini döndür
    return formattedDateTime;
  });


  app.register(fastyfyMultipart);

  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  await app.register(secureSession, {
    secret: process.env['SECRET_KEY'] || 'averylogphrasebiggerthanthirtytwochars',
    salt: 'mq9hDxBVDbspDR6n',
    cookieName: 'realestate',
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60
    }
  })
  app.useGlobalFilters(new ErrorService())
  await app.register(fastifyCsrf)
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();