CREATE MIGRATION m17etqonttuzajkjtqcklzub5hzw7n32hopqggoh7bgpg7bp55niha
    ONTO m1rgjk3eo7mrpddcgbmhfluvaosn3g5beme4rap2lqtsbbomrvjy4q
{
  ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK codeQueryType {
          RENAME TO codeQueryTypeAlt;
      };
  };
};
