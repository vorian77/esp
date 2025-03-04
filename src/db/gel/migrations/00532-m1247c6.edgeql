CREATE MIGRATION m1247c6gav4blibhirgncfopxpr3bw7fy3x4wkid2ac7vurqw4qzkq
    ONTO m1qdyn7bfubtyvxbrceiintv4kpj6tlsmbo744khfpym4eu26l5u5a
{
              ALTER TYPE sys_core::SysNodeObj {
      ALTER PROPERTY isHideRowManager {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
