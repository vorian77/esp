CREATE MIGRATION m1kxjnnxppljlsvw7hrxovulkvq3x4jkmygdd6ontpjp5zy6j3cp6q
    ONTO m13t5ca7eb2qdmam26sg2uvxo6waugfcewpuvhu4zeyog47xqkfc4q
{
          ALTER TYPE sys_core::SysDataObjTable {
      CREATE PROPERTY exprFilterUpdate: std::str;
  };
};
