CREATE MIGRATION m1ar34gfqecs7cxniqk3wv7sqdajshic2evbjchdkhu4c3gp2fxuua
    ONTO m1llgz4u6gneer7iwsrmweoeowepgvtnbpol53cblq2xh3t4rgq3wq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY isBacklink: std::bool;
  };
};
