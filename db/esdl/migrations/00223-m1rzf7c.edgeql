CREATE MIGRATION m1rzf7cw7pgdthtjz2qbeg6t73qpuvf7g7erdfy6bgaujzufyakmtq
    ONTO m1i5kwylpilrl4kcfxomaic4ri3yyx3pwo7xlqrue5gm2nswdmgqtq
{
                  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK customElement {
          SET MULTI;
      };
  };
};
