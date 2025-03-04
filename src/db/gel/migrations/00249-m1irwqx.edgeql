CREATE MIGRATION m1irwqxelizdduoe6j7rrrzfgkxo7buxsplekxidh235uja2dy4jpq
    ONTO m1mqc75zkk7c27or6435ky4fle2z5vcgpro6o3a2bqdfq2pe34vhla
{
                              ALTER TYPE sys_core::SysNodeObj {
      ALTER LINK codeType {
          RENAME TO codeNodeType;
      };
  };
};
