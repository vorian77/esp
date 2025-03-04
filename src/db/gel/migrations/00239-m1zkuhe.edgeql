CREATE MIGRATION m1zkuhexfmuip2edxjqc7lhrsfmftw22qqfembrtlzg3smmgcojcmq
    ONTO m1njmfkh2rzotp7bxigfbelp4uvrwegu3ny7hheykma3ghjfq5ippa
{
                              ALTER TYPE sys_core::SysDataObjActionQuery {
      ALTER LINK parms {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
      ALTER LINK triggers {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
