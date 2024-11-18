CREATE MIGRATION m1b45wjazgjeexaklr3hoth4tj2tj7nkssblinntrsokqs2piycsba
    ONTO m1ojcjxzdb2socos5wd7zrirlslekgpt6evwipoevpzr2y7nnhkqha
{
      CREATE TYPE sys_core::SysDataObjWith {
      CREATE REQUIRED PROPERTY expr: std::str;
      CREATE REQUIRED PROPERTY index: default::nonNegative;
  };
  ALTER TYPE sys_core::SysDataObj {
      CREATE MULTI LINK withs: sys_core::SysDataObjWith {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY indexWith: default::nonNegative;
  };
};
