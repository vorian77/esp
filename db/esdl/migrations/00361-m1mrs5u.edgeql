CREATE MIGRATION m1mrs5uvp4s2azyl7bsqqhvge32ktcopd5ihtaxzyjeaoqcamdg3ta
    ONTO m1hupnj3hjmhq5yg2d46zbosa52ec6mtc2hdjk5kkga2bkqw47udma
{
      ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customElement {
          SET MULTI;
      };
  };
};
