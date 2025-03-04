CREATE MIGRATION m1dwaxae7tssntnoqh2cyg2uiojhcelzatcr53xr2vsoznwl5bay3q
    ONTO m1lsgupy3tbxw4m3oafak5vsbd5yl4wjgnxjptx5vuclp3l5rfhita
{
  ALTER TYPE app_cm::CmClient {
      ALTER LINK personOld {
          RESET OPTIONALITY;
      };
  };
};
