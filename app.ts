import '@std/dotenv/load';
import { Application, Router } from '@oak/oak';
import * as dejs from '@hongminhee/dejs';

import { setupRoutes } from './src/routes/index.ts';
import loggingMiddleware from './src/middleware/logging.ts';
import errorBoundaryMiddleware from './src/middleware/errorBoundary.ts';

// 타입 정의
interface TemplateData {
  name: string;
  message: string;
}

// EJS 파일을 문자열로 렌더링하는 함수
async function renderEjsTemplate<T>(
  filePath: string,
  data: T
): Promise<string> {
  try {
    return await dejs.renderFileToString(`./src/views/${filePath}`, { data });
  } catch (error) {
    console.error(`템플릿 렌더링 오류: ${error}`);
    return `<h1>템플릿 렌더링 오류가 발생했습니다</h1>`;
  }
}

const app = new Application();
const router = new Router();

app.use(loggingMiddleware);
app.use(errorBoundaryMiddleware);

setupRoutes(app);
// 특정 경로에 대한 라우팅 설정
router.get('/', async (ctx) => {
  // 타입이 지정된 데이터 객체
  const templateData: TemplateData = {
    name: 'Deno',
    message: 'Deno API (Beta)',
  };

  const html = await renderEjsTemplate<TemplateData>('index.ejs', templateData);
  ctx.response.body = html;
  ctx.response.type = 'text/html';
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = Deno.env.get('PORT');

if (!port) {
  throw new Error('Port must be specified');
}

app.addEventListener('listen', () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다`);
});

await app.listen({ port: parseInt(port) });
