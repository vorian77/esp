CREATE MIGRATION m1mrswytelxckmo2wjp32f4wodcfjgqa7mgh7bqk5s4wlgowx4gnva
    ONTO m1w46tpsqpivfg34imqwnaxucufmqgrat6bzuavvy7j3s3b3z7csha
{
  ALTER TYPE default::SysPerson {
      DROP EXTENDING sys_core::ObjRoot;
      EXTENDING sys_core::ObjRootCore LAST;
  };
};
