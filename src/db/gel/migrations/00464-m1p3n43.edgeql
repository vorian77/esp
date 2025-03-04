CREATE MIGRATION m1p3n43cyeox6roftkkw7bw3uk2hdf3qcslidm3twoisyla2zqnthq
    ONTO m136vs5zpzsjkcvyxqjilkt23hqvx2lm7y4tx3ifywr4upbj67xsga
{
              ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      CREATE PROPERTY test: std::str;
  };
};
