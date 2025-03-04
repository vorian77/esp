CREATE MIGRATION m1qdyn7bfubtyvxbrceiintv4kpj6tlsmbo744khfpym4eu26l5u5a
    ONTO m1ziecbcwidhxtkubyukpinosdzqmrk3vkzg2mnt3gxk7eifikuodq
{
              ALTER TYPE sys_core::SysNodeObj {
      CREATE PROPERTY isHideRowManager: std::bool;
  };
};
