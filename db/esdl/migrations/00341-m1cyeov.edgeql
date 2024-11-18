CREATE MIGRATION m1cyeovin3ygeodqb3a2pxo56cba4wud6ylhrxmp5ssgafofxiqy3q
    ONTO m16rrdrwc67uugxdt3rb3vt5pftyx4a4mtctetjg3svw7z2hwwmpdq
{
      ALTER TYPE sys_rep::SysRepParm {
      CREATE LINK codeType: sys_core::SysCodeType;
  };
};
