CREATE MIGRATION m1xplgzhdsh6eeyhml37wrwtd2iz2s3ytibbfnmzjj7zckgojulbta
    ONTO m17zj6p6u7js2kpefaow4wdcmmx5r4d7wwpg37yxtlnwnwq3hugxoq
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY userResourceSaveParmsSelect: std::json;
  };
};
