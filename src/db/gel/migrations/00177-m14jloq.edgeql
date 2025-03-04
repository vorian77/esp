CREATE MIGRATION m14jloqznahcszyvfkt2ph6i3s46tqavvz5lvq25wzatraymh2ch7q
    ONTO m1mbbdnp6rm5jplawpzcksidxm3kel555zjnafpbf67epz3pb74vkq
{
                              ALTER TYPE sys_core::SysDataObjAction {
      ALTER PROPERTY checkObjChanged {
          RENAME TO confirmBeforeChanged;
      };
  };
};
