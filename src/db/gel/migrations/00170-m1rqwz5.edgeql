CREATE MIGRATION m1rqwz5rhqhiiicez23t3hv5dfdbznlx6ps76iblvhltjj3mwnzhja
    ONTO m1gc26id37o22jjwqyv62mjnqezpi4h24udgpib7cd3tt5gy372hoq
{
                              ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK codeType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
