CREATE MIGRATION m1dbuguyaly6tplsfikpj42uzfnrj54gh27ibw2i7letgqxudkjnmq
    ONTO m1exoui6m2ame6osueusqze7y6m3w2mllbs6skvqxeew2vmffbtfdq
{
  ALTER TYPE sys_core::SysDataObjFieldEmbedDetail {
      DROP LINK actionFieldGroup;
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListConfig {
      ALTER LINK actionFieldGroup {
          RENAME TO actionFieldGroupModal;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListEdit {
      ALTER LINK dataObjList {
          RENAME TO dataObEmbed;
      };
  };
  ALTER TYPE sys_core::SysDataObjFieldEmbedListSelect {
      ALTER LINK actionFieldGroup {
          RENAME TO actionFieldGroupModal;
      };
  };
};
