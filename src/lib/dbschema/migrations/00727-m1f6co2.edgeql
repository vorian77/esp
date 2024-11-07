CREATE MIGRATION m1f6co2vjegeyhssbn5rkpdriloe4ica3x2dzpkryliheaxxkewrwq
    ONTO m1nf3jwj5noqc3ln3xliqf7vmfaicb6vtfvrtsl2gkzgux62yzgxqa
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customEmbedShellFields {
          ON TARGET DELETE ALLOW;
      };
  };
};
