CREATE MIGRATION m1l7tpvqbjre5kok546vjrr4nnt6hxdwj2wumj3bhc5tcijiyiw4va
    ONTO m1xplgzhdsh6eeyhml37wrwtd2iz2s3ytibbfnmzjj7zckgojulbta
{
              ALTER TYPE sys_core::SysApp {
      ALTER LINK nodes {
          ON TARGET DELETE ALLOW;
      };
  };
};
