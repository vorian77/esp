CREATE MIGRATION m1fzge43gpcuns7mncrunkyuucpoamotrryf6pggiik556ssenenxa
    ONTO m1w5u5czihip33cdat2eozgrbft7crwquxfsab6unvyrjagjffdmta
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY isRetrieveReadonly: std::bool;
  };
};
