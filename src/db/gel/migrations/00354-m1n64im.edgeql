CREATE MIGRATION m1n64im6e3ef3hkfxibgbrasxf3o7gwwoa7vt3nz5n6ize54pbbc5q
    ONTO m1oeke77tfnnq3t7zdghund4ulji2oene5n4sterlacgglrxp45qqa
{
                  ALTER TYPE sys_core::SysDataObjFieldListSelect {
      ALTER PROPERTY isAutoSelect {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY isListEdit {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
