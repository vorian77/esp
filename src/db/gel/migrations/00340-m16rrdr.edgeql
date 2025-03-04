CREATE MIGRATION m16rrdrwc67uugxdt3rb3vt5pftyx4a4mtctetjg3svw7z2hwwmpdq
    ONTO m1fugfro65ynflom2ysa3jipnfhcyw6rtjen53elcx4pfuln66fioq
{
                  ALTER TYPE sys_rep::SysRepParm {
      ALTER LINK codeType {
          RENAME TO codeParmType;
      };
  };
};
