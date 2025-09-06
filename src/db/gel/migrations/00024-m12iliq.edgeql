CREATE MIGRATION m12iliqgowg5p26qrbh5wo24gykfqbhae4a2uezatmc5inuvww22aq
    ONTO m1u5at52wsds6iert447qx7qw6g6qelxahoy6pt24sxwy3s2zimsiq
{
  ALTER TYPE sys_core::SysDataObjColumn {
      CREATE PROPERTY customColIsBold: std::bool;
  };
};
