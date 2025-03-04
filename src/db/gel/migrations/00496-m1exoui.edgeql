CREATE MIGRATION m1exoui6m2ame6osueusqze7y6m3w2mllbs6skvqxeew2vmffbtfdq
    ONTO m1bfkd2bjmygetnh3r7i2ulaqekdr327bkydzfv3nev4hmodibz6ya
{
              ALTER TYPE sys_core::SysDataObjFieldEmbedDetail {
      ALTER LINK dataObjDetail {
          RENAME TO dataObjEmbed;
      };
  };
};
