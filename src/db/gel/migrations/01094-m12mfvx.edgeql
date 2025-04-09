CREATE MIGRATION m12mfvx7d3vrc76lardwccjdwtc7ymc4dsor3zw7jjx6yhaahelhlq
    ONTO m1oywru7m6ra3yyurjnlfd2mzdrzatjtngf2ptdzrfnrkg46gsh46a
{
  ALTER TYPE sys_core::SysDataObjColumnItemValue {
      ALTER PROPERTY data {
          RENAME TO itemData;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItemValue {
      ALTER PROPERTY display {
          RENAME TO itemDisplay;
      };
  };
};
