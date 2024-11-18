CREATE MIGRATION m1zcsxr5k42qee666k6a6sxbdirrjr5esifd63joxsinpe2liysxgq
    ONTO m1a4cxrr2ijl3yuxlv2plpnqf32m4tnzquk5bascm7zmfeumshzrpa
{
  ALTER TYPE sys_rep::SysRepUser {
      ALTER LINK report {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
