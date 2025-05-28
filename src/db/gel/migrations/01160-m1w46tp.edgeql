CREATE MIGRATION m1w46tpsqpivfg34imqwnaxucufmqgrat6bzuavvy7j3s3b3z7csha
    ONTO m1j3rrnoy6uup5wsoznnwcrl3jnikstnxrp4uet4dq4gac6lyduunq
{
  ALTER TYPE sys_core::ObjRootCore {
      ALTER PROPERTY name {
          RESET CARDINALITY;
          RESET OPTIONALITY;
      };
  };
};
