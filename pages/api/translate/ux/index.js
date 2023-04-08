import knex from "knex";
import path from "path";
const __dirname = path.resolve()

export default async function handler(req, res) {
    const translate = knex({
        client: 'sqlite3',
        connection: {
          filename: path.resolve(__dirname, "translate/ux/index.sqlite")
        },
        useNullAsDefault: true,
    });
    // const result =  await translate.raw(`CREATE TABLE [ux] (
    //     [name] TEXT,
    //     [kk] TEXT,
    //     [ru] TEXT,
    //     [en] TEXT
    //   );      
    // `);
    // const result1 = await translate.raw(`INSERT INTO [ux] VALUES
    // ('continue','Жалғастыру','Продолжить','Continue'),
    // ('save','Сақтау','Сохранить','Save'),
    // ('skip','Өткізіп жіберу','Пропустить','Skip'),
    // ('back','Артқа','Назад','Back'),
    // ('start','Бастау','Начать','Start'),
    // ('finish','Аяқтау?','Завершить?','Finish?'),
    // ('fullframe_open','Толық экран режимінде қарау','Смотреть в полноэкранном режиме','Watch in full-screen mode'),
    // ('fullframe_close','Толық экран режімін жабу','Закрыть полноэкранный режим','Close full-screen mode'),
    // ('home','Үйге','Домой','Home'),
    // ('cancel','Жабу','Закрыть','Cancel'),
    // ('delete','Жою','Удалить','Delete'),
    // ('back','Артқа қайту','Вернуться назад','Return back'),
    // ('login','Кіру','Войти','Sign in'),
    // ('service','Қызмет','Сервис','Service'),
    // ('rating','Рейтинг','Рейтинг','Rating'),
    // ('language','Тіл','Язык','Language'),
    // ('more','Тағы','Еще','More'),
    // ('developer','Әзірлеуші','Разработчик','Developer'),
    // ('release','Шығарылды','Выпущен','Release'),
    // ('open','Ашу','Открыть','Open');
    // `)
    const s = await translate.raw("SELECT * FROM ux");
    res.status(200).json(s)
}