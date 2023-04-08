import knex from "knex";
import path from "path";
const __dirname = path.resolve()

export default async function handler(req, res) {
    const translate = knex({
        client: 'sqlite3',
        connection: {
          filename: path.resolve(__dirname, "translate/services/index.sqlite")
        },
        useNullAsDefault: true,
    });
    // const result =  await translate.raw(`CREATE TABLE [services_translate] (
    //   [name] TEXT,
    //   [kk] TEXT,
    //   [ru] TEXT,
    //   [en] TEXT
    // );
    // `);
    // const result1 = await translate.raw(`INSERT INTO [services_translate] VALUES
    // ('home','Басты бет','Главная','Home'),
    // ('constructor','Құрастырғыш','Конструктор','Constructor'),
    // ('calculator','Есептегіш','Калькулятор','Calculator'),
    // ('business','Кәсіп','Бизнес','Business'),
    // ('education','Білім','Образование','Education'),
    // ('health','Денсаулық','Здоровье','Health'),
    // ('finance','Қаржы','Финансы','Finance'),
    // ('tech','Технологиялар','Технологии','Technologies'),
    // ('others','Басқалар','Другие','Others'),
    // ('acc_const','Бейджик Құрастырушысы','Конструктор Бейджиков','Badge Сonstructor'),
    // ('bmi_calc','ДСИ Есептегіш (Ересек)','ИМТ Калькулятор (Взрослый)','BMI Сalculator (Adult)'),
    // ('ideal_weight_calc','Мінсіз Салмақ Есептегіші','Калькулятор Идеального Веса','Ideal Weight Calculator'),
    // ('deposit_calc','Депозиттік есептегіш','Депозитный калькулятор','Deposit Calculator'),
    // ('margin_markup_calc','Маржа мен үстеме бағаны есептеу калькуляторы','Калькулятор расчета маржи и наценки','Margin and markup calculator'),
    // ('pregnancy_calendar','Жүктілік күнтізбесі','Календарь беременности','Pregnancy calendar'),
    // ('index_of_the_smoking_person','Темекі шегетін адамның индексі','Индекс курящего человека','Index of the smoking person'),
    // ('rh_factor_in_family_planning','Отбасын жоспарлау кезіндегі Rh факторы','Резус фактор при планировании семьи','Rh factor in family planning'),
    // ('qr','QR сканері','Сканнер QR','QR scanner'),
    // ('image_editor','Сурет редакторы','Фото редактор','Image Editor'),
    // ('counter','Санағыш','Счетчик','Counter'),
    // ('simple_calculator','Ыңғайлы есептегіш','Удобный калькулятор','Simple calculator'),
    // ('clock','Сағат','Часы','Clock');`)
    const s = await translate.raw("SELECT * FROM services");
    const t = await translate.raw("SELECT * FROM services_translate");
    res.status(200).json({list:s,translate:t})
}