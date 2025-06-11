CREATE MIGRATION m1ebhilulj44xh4p4zl3uq3fov2i6esfvpnn7wck4e6fprnsldla6a
    ONTO m1kog5l4i5wpl2h5w3okbpfnkfrmdo2evnjw57k3kutq7ehafrpxrq
{
  ALTER TYPE sys_core::SysCode {
      DROP CONSTRAINT std::exclusive ON ((.ownerOld, .codeType, .name));
  };
};
