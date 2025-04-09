CREATE MIGRATION m1wgiz7defmmt3axcexfxwaxbf6635pr2bdxq2g6cpr3kzyvohwoha
    ONTO m12mfvx7d3vrc76lardwccjdwtc7ymc4dsor3zw7jjx6yhaahelhlq
{
  ALTER TYPE sys_core::SysMsg {
      CREATE LINK threadOpen := (SELECT
          .thread
      FILTER
          .isOpen
      );
  };
};
