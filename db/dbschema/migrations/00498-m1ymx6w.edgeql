CREATE MIGRATION m1ymx6wetyayxbunakrfrtpcggwuvxsternbuw5rrtmnigliqp2jdq
    ONTO m1dbuguyaly6tplsfikpj42uzfnrj54gh27ibw2i7letgqxudkjnmq
{
  ALTER TYPE sys_core::SysDataObjFieldEmbedListEdit {
      ALTER LINK dataObEmbed {
          RENAME TO dataObjEmbed;
      };
  };
};
