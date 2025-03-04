CREATE MIGRATION m1lzstl3gw5nwhviubvj4syn6glxo26loa42tatg6dfdos47r7ijwa
    ONTO m1rya7re5mvmenktq3mvqqrqs4lrwcxzotqsjp34nzi7ixl4hrjl6q
{
              ALTER TYPE sys_core::SysObj {
      CREATE CONSTRAINT std::exclusive ON ((.owner, .name));
  };
};
