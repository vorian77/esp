CREATE MIGRATION m1kl7bjc4bzy3eytcy6rsmvktixczvpybd2a2wmtrngma22zsyojra
    ONTO m1owiut2ruedm2ikzzqk3xmortl7bvtrmvety5ircsgzyua7df35jq
{
                              ALTER TYPE sys_core::SysDataObjColumn {
      DROP LINK linkColumnsDisplay;
  };
};
