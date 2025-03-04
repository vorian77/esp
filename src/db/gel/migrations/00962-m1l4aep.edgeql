CREATE MIGRATION m1l4aep3fjoxcsz3jshoslzpxeuhc6uvkkhjbdto6t3pbqrkykpoaa
    ONTO m15o2nkzcoesxukshl4oa4kxhfzxnnbkdp6dnmahg3pwpmskk2l7jq
{
  ALTER TYPE sys_core::SysNodeObjData {
      ALTER LINK dataObj {
          ON TARGET DELETE DELETE SOURCE;
      };
  };
};
