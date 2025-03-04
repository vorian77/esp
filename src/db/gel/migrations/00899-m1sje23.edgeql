CREATE MIGRATION m1sje23p74rvouvuyseumionymr25mjawwrly6dxsdusfvjfkitp7q
    ONTO m1uxsdh22hvbjnab22wnoofomu5lodw2wa2hrb2l7fvblc7oheowoa
{
  ALTER TYPE sys_core::SysDataObjActionGroup {
      ALTER LINK actions {
          RENAME TO dataObjActions;
      };
  };
};
