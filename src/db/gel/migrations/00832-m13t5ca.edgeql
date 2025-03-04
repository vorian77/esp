CREATE MIGRATION m13t5ca7eb2qdmam26sg2uvxo6waugfcewpuvhu4zeyog47xqkfc4q
    ONTO m1sx56ms7omgmys74xpy66juoufuldk5iwippzwztr5pc7s3wj642q
{
          ALTER TYPE sys_core::SysDataObjTable {
      CREATE PROPERTY isTableExtension: std::bool;
  };
};
