CREATE MIGRATION m1qnvdi6ml3bu245pvugzwa3tyx3myquzhkkc7go4ishmumxrxnwxa
    ONTO m1akt6ozgv27b6dcw3cdld6jlaeu3cljykfp7sf3ulqwxa3mgbt62a
{
  ALTER TYPE sys_core::ObjRoot {
      CREATE PROPERTY orderDefine: default::nonNegative;
  };
  ALTER TYPE sys_core::SysNodeObj {
      ALTER PROPERTY orderDefine {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
      CREATE PROPERTY orderDefineOld: default::nonNegative;
  };
};
