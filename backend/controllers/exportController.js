// controllers/exportController.js
// RPP Integrasi Pembelajaran Mendalam & KBC - Modern DOCX Export

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  PageOrientation,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  VerticalAlign,
} from "docx";

const C = {
  navy: "17324D",
  navy2: "234B6F",
  teal: "147D7A",
  tealSoft: "EAF6F5",
  gold: "C89B3C",
  goldSoft: "FBF5E7",
  ink: "24313D",
  muted: "66727E",
  line: "D9E1E8",
  soft: "F5F7F9",
  white: "FFFFFF",
};

const border = (color = C.line, size = 6) => ({
  top: { style: BorderStyle.SINGLE, size, color },
  bottom: { style: BorderStyle.SINGLE, size, color },
  left: { style: BorderStyle.SINGLE, size, color },
  right: { style: BorderStyle.SINGLE, size, color },
});

const cell = (text = "", options = {}) =>
  new TableCell({
    width: options.width
      ? { size: options.width, type: WidthType.PERCENTAGE }
      : undefined,

    shading: options.fill
      ? { fill: options.fill, type: ShadingType.CLEAR }
      : undefined,

    borders:
      options.borders === false
        ? undefined
        : border(
            options.borderColor || C.line,
            options.borderSize || 6
          ),

    verticalAlign:
      options.verticalAlign || VerticalAlign.CENTER,

    margins:
      options.margins || {
        top: 110,
        bottom: 110,
        left: 140,
        right: 140,
      },

    children: [
      new Paragraph({
        alignment:
          options.align || AlignmentType.LEFT,

        spacing: {
          before: 0,
          after: 0,
          line: 260,
        },

        children: [
          new TextRun({
            text: String(text ?? ""),
            bold: !!options.bold,
            color: options.color || C.ink,
            size: options.size || 21,
            font: "Aptos",
          }),
        ],
      }),
    ],
  });

const p = (text = "", options = {}) =>
  new Paragraph({
    alignment:
      options.align || AlignmentType.LEFT,

    spacing: {
      before: options.before ?? 0,
      after: options.after ?? 100,
      line: options.line ?? 280,
    },

    indent: options.indent,

    bullet: options.bullet
      ? { level: 0 }
      : undefined,

    children: [
      new TextRun({
        text: String(text ?? ""),
        bold: !!options.bold,
        italic: !!options.italic,
        color: options.color || C.ink,
        size: options.size || 21,
        font: "Aptos",
      }),
    ],
  });

const rich = (parts = [], options = {}) =>
  new Paragraph({
    alignment:
      options.align || AlignmentType.LEFT,

    spacing: {
      before: options.before ?? 0,
      after: options.after ?? 100,
      line: options.line ?? 280,
    },

    children: parts.map(
      (x) =>
        new TextRun({
          text: String(x.text ?? ""),
          bold: !!x.bold,
          italic: !!x.italic,
          color: x.color || options.color || C.ink,
          size: x.size || options.size || 21,
          font: "Aptos",
        })
    ),
  });

const sectionTitle = (
  number,
  title,
  subtitle = ""
) =>
  new Paragraph({
    spacing: {
      before: 80,
      after: 170,
    },

    children: [
      new TextRun({
        text: `${number}  `,
        bold: true,
        color: C.gold,
        size: 24,
        font: "Aptos Display",
      }),

      new TextRun({
        text: title,
        bold: true,
        color: C.navy,
        size: 28,
        font: "Aptos Display",
      }),

      ...(subtitle
        ? [
            new TextRun({
              text: `\n${subtitle}`,
              color: C.muted,
              size: 18,
              font: "Aptos",
            }),
          ]
        : []),
    ],
  });

const card = (
  title,
  body,
  accent = C.teal,
  fill = C.soft
) =>
  new Table({
    width: {
      size: 100,
      type: WidthType.PERCENTAGE,
    },

    borders: border(fill, 1),

    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: {
              fill,
              type: ShadingType.CLEAR,
            },

            borders: border(fill, 1),

            margins: {
              top: 140,
              bottom: 140,
              left: 180,
              right: 180,
            },

            children: [
              new Paragraph({
                spacing: {
                  after: 50,
                },

                children: [
                  new TextRun({
                    text: title,
                    bold: true,
                    color: accent,
                    size: 22,
                    font: "Aptos Display",
                  }),
                ],
              }),

              new Paragraph({
                spacing: {
                  after: 0,
                  line: 280,
                },

                children: [
                  new TextRun({
                    text: String(body ?? ""),
                    color: C.ink,
                    size: 20,
                    font: "Aptos",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

const pageBreak = () =>
  new Paragraph({
    pageBreakBefore: true,
    children: [],
  });

const bulletList = (items = []) =>
  items
    .filter(
      (x) =>
        x !== undefined &&
        x !== null &&
        String(x).trim()
    )
    .map((x) =>
      p(
        String(x).replace(/^[-•]\s*/, ""),
        {
          bullet: true,
        }
      )
    );

const splitActivity = (text) => {
  const s = String(text || "")
    .replace(/\*\*/g, "")
    .trim();

  const m = s.match(
    /^([^:]+):\s*(.*)$/
  );

  return m
    ? {
        label: m[1].trim(),
        body: m[2].trim(),
      }
    : {
        label: "Aktivitas",
        body: s,
      };
};

const buildLearningJourney = (
  items = []
) => {
  const phases = {
    Memahami: [],
    Mengaplikasi: [],
    Merefleksi: [],
  };

  let current = null;

  for (const raw of items) {
    const s = String(raw || "")
      .replace(/\*\*/g, "")
      .trim();

    if (/^Memahami\s*:/i.test(s)) {
      current = "Memahami";
      continue;
    }

    if (/^Mengaplikasi\s*:/i.test(s)) {
      current = "Mengaplikasi";
      continue;
    }

    if (/^Merefleksi\s*:/i.test(s)) {
      current = "Merefleksi";
      continue;
    }

    if (current && s) {
      phases[current].push(
        splitActivity(s)
      );
    }
  }

  return phases;
};

const selected = (
  rpp,
  key,
  fallback = ""
) =>
  rpp?.identitas?.[key] ??
  fallback;

export const exportWord = async (
  req,
  res
) => {
  try {
    const rpp = req.body || {};

    const identitas =
      rpp.identitas || {};

    /*
     * =====================================================
     * DATA UTAMA
     * =====================================================
     */

    const profilLulusan = selected(
      rpp,
      "Profil Lulusan",
      "-"
    );

    const topikKBC = selected(
      rpp,
      "Topik KBC",
      "-"
    );

    const fase = selected(
      rpp,
      "Fase",
      "-"
    );

    const kelas = selected(
      rpp,
      "Kelas",
      "-"
    );

    const tema = selected(
      rpp,
      "Tema",
      "-"
    );

    const mapel = selected(
      rpp,
      "Mata Pelajaran",
      "-"
    );

    const madrasah = selected(
      rpp,
      "Nama Madrasah",
      "-"
    );

    const tahun = selected(
      rpp,
      "Tahun Ajaran",
      "-"
    );

    const alokasi = selected(
      rpp,
      "Alokasi Waktu",
      "-"
    );

    const pedagogik =
      rpp.praktek_pedagogik?.model ||
      "-";

    /*
     * =====================================================
     * LEARNING JOURNEY
     * =====================================================
     */

    const journey =
      buildLearningJourney(
        rpp.kegiatan_inti || []
      );

    /*
     * =====================================================
     * DOCUMENT
     * =====================================================
     */

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Aptos",
              size: 21,
              color: C.ink,
            },

            paragraph: {
              spacing: {
                line: 280,
                after: 90,
              },
            },
          },
        },

        paragraphStyles: [
          {
            id: "Normal",
            name: "Normal",

            run: {
              font: "Aptos",
              size: 21,
              color: C.ink,
            },

            paragraph: {
              spacing: {
                line: 280,
                after: 90,
              },
            },
          },
        ],
      },

      sections: [
        {
          properties: {
            page: {
              size: {
                orientation:
                  PageOrientation.PORTRAIT,

                width: 11906,
                height: 16838,
              },

              margin: {
                top: 900,
                right: 900,
                bottom: 900,
                left: 900,
              },
            },
          },

          children: [

            /*
             * =================================================
             * COVER
             * =================================================
             */

            new Paragraph({
              spacing: {
                before: 700,
                after: 80,
              },

              alignment:
                AlignmentType.CENTER,

              children: [
                new TextRun({
                  text: "PENGAWAS KEREN",
                  bold: true,
                  color: C.teal,
                  size: 22,
                  font: "Aptos Display",
                }),
              ],
            }),

            new Paragraph({
              alignment:
                AlignmentType.CENTER,

              spacing: {
                after: 110,
              },

              children: [
                new TextRun({
                  text: "RENCANA PELAKSANAAN",
                  bold: true,
                  color: C.navy,
                  size: 34,
                  font: "Aptos Display",
                }),
              ],
            }),

            new Paragraph({
              alignment:
                AlignmentType.CENTER,

              spacing: {
                after: 300,
              },

              children: [
                new TextRun({
                  text: "PEMBELAJARAN",
                  bold: true,
                  color: C.navy,
                  size: 34,
                  font: "Aptos Display",
                }),
              ],
            }),

            card(
              "INTEGRASI PEMBELAJARAN MENDALAM & KBC",
              `${mapel}  •  ${tema}`,
              C.gold,
              C.goldSoft
            ),

            new Paragraph({
              spacing: {
                after: 180,
              },

              children: [],
            }),

            /*
             * IDENTITAS COVER
             */

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              borders: border(
                C.white,
                0
              ),

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "MADRASAH",
                      {
                        bold: true,
                        color: C.muted,
                        fill: C.soft,
                      }
                    ),

                    cell(
                      madrasah,
                      {
                        bold: true,
                        fill: C.soft,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "FASE / KELAS",
                      {
                        bold: true,
                        color: C.muted,
                        fill: C.white,
                      }
                    ),

                    cell(
                      `${fase} / ${kelas}`,
                      {
                        bold: true,
                        fill: C.white,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "TAHUN AJARAN",
                      {
                        bold: true,
                        color: C.muted,
                        fill: C.soft,
                      }
                    ),

                    cell(
                      tahun,
                      {
                        bold: true,
                        fill: C.soft,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "ALOKASI WAKTU",
                      {
                        bold: true,
                        color: C.muted,
                        fill: C.white,
                      }
                    ),

                    cell(
                      alokasi,
                      {
                        bold: true,
                        fill: C.white,
                      }
                    ),
                  ],
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                after: 180,
              },

              children: [],
            }),

            /*
             * PROFIL + KBC
             */

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              borders: border(
                C.white,
                0
              ),

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "PROFIL LULUSAN\n" +
                        profilLulusan,
                      {
                        fill: C.tealSoft,
                        bold: true,
                        color: C.teal,
                      }
                    ),

                    cell(
                      "TOPIK KBC\n" +
                        topikKBC,
                      {
                        fill: C.goldSoft,
                        bold: true,
                        color: C.gold,
                      }
                    ),
                  ],
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 300,
                after: 0,
              },

              alignment:
                AlignmentType.CENTER,

              children: [
                new TextRun({
                  text:
                    "Dokumen Perencanaan Pembelajaran",
                  italic: true,
                  color: C.muted,
                  size: 18,
                  font: "Aptos",
                }),
              ],
            }),

            pageBreak(),

            /*
             * =================================================
             * 01 PROFIL PEMBELAJARAN
             * =================================================
             */

            sectionTitle(
              "01",
              "Profil Pembelajaran",
              "Ringkasan desain pembelajaran yang dipilih guru"
            ),

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "Komponen",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                        align:
                          AlignmentType.CENTER,
                      }
                    ),

                    cell(
                      "Pilihan / Informasi",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),
                  ],
                }),

                ...[
                  [
                    "Mata Pelajaran",
                    mapel,
                  ],

                  [
                    "Fase / Kelas",
                    `${fase} / ${kelas}`,
                  ],

                  [
                    "Tema / Materi",
                    tema,
                  ],

                  [
                    "Praktik Pedagogik",
                    pedagogik,
                  ],

                  [
                    "Profil Lulusan",
                    profilLulusan,
                  ],

                  [
                    "Topik KBC",
                    topikKBC,
                  ],

                  [
                    "Alokasi Waktu",
                    alokasi,
                  ],
                ].map(
                  ([a, b], i) =>
                    new TableRow({
                      children: [
                        cell(a, {
                          bold: true,
                          fill:
                            i % 2 === 0
                              ? C.soft
                              : C.white,
                        }),

                        cell(b, {
                          fill:
                            i % 2 === 0
                              ? C.soft
                              : C.white,
                        }),
                      ],
                    })
                ),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 220,
                after: 100,
              },

              children: [
                new TextRun({
                  text:
                    "Capaian Pembelajaran",
                  bold: true,
                  color: C.navy,
                  size: 25,
                  font: "Aptos Display",
                }),
              ],
            }),

            card(
              "CAPAIAN PEMBELAJARAN",
              rpp.capaian_pembelajaran ||
                "-",
              C.teal,
              C.tealSoft
            ),

            new Paragraph({
              spacing: {
                before: 180,
                after: 100,
              },

              children: [
                new TextRun({
                  text:
                    "Tujuan Pembelajaran",
                  bold: true,
                  color: C.navy,
                  size: 25,
                  font: "Aptos Display",
                }),
              ],
            }),

            ...bulletList(
              rpp.tujuan_pembelajaran ||
                []
            ),

            new Paragraph({
              spacing: {
                before: 120,
                after: 100,
              },

              children: [
                new TextRun({
                  text:
                    "Indikator Tujuan Pembelajaran",
                  bold: true,
                  color: C.navy,
                  size: 25,
                  font: "Aptos Display",
                }),
              ],
            }),

            ...bulletList(
              rpp.indikator_tujuan_pembelajaran ||
                []
            ),

            pageBreak(),

            /*
             * =================================================
             * 02 INTEGRASI PM + KBC
             * =================================================
             */

            sectionTitle(
              "02",
              "Integrasi Pembelajaran Mendalam & KBC",
              "Keterkaitan antara pengalaman belajar dan nilai yang dikembangkan"
            ),

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "Tahap Pembelajaran Mendalam",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),

                    cell(
                      "Fokus Pengalaman Murid",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),

                    cell(
                      "Keterkaitan KBC",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "Memahami",
                      {
                        bold: true,
                        color: C.teal,
                        fill: C.tealSoft,
                      }
                    ),

                    cell(
                      "Membangun pemahaman awal, mengamati stimulus, dan mengidentifikasi masalah.",
                      {
                        fill: C.tealSoft,
                      }
                    ),

                    cell(
                      topikKBC,
                      {
                        fill: C.tealSoft,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "Mengaplikasi",
                      {
                        bold: true,
                        color: C.navy,
                        fill: C.soft,
                      }
                    ),

                    cell(
                      "Menggunakan pengetahuan melalui kegiatan, pengumpulan data, praktik, atau pemecahan masalah.",
                      {
                        fill: C.soft,
                      }
                    ),

                    cell(
                      profilLulusan,
                      {
                        fill: C.soft,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "Merefleksi",
                      {
                        bold: true,
                        color: C.gold,
                        fill: C.goldSoft,
                      }
                    ),

                    cell(
                      "Memverifikasi temuan, menyimpulkan, dan merefleksikan pengalaman belajar.",
                      {
                        fill: C.goldSoft,
                      }
                    ),

                    cell(
                      `${topikKBC} + ${profilLulusan}`,
                      {
                        fill: C.goldSoft,
                      }
                    ),
                  ],
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 220,
                after: 100,
              },

              children: [
                new TextRun({
                  text:
                    "Materi Insersi KBC",
                  bold: true,
                  color: C.navy,
                  size: 23,
                  font: "Aptos Display",
                }),
              ],
            }),

            card(
              "INSERSI NILAI",
              rpp.materi_insersi_KBC ||
                "-",
              C.gold,
              C.goldSoft
            ),

            pageBreak(),

            /*
             * =================================================
             * 03 DESAIN PEMBELAJARAN
             * =================================================
             */

            sectionTitle(
              "03",
              "Desain Pembelajaran",
              "Lingkungan, mitra, dan pemanfaatan digital"
            ),

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "Lingkungan Pembelajaran",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.teal,
                      }
                    ),

                    cell(
                      "Mitra Pembelajaran",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.teal,
                      }
                    ),

                    cell(
                      "Pemanfaatan Digital",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.teal,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      (
                        rpp.lingkungan_pembelajaran ||
                        []
                      )
                        .map(
                          (x, i) =>
                            `${i + 1}. ${x}`
                        )
                        .join("\n"),
                      {
                        fill: C.tealSoft,
                      }
                    ),

                    cell(
                      (
                        rpp.mitra_pembelajaran ||
                        []
                      )
                        .map(
                          (x, i) =>
                            `${i + 1}. ${x}`
                        )
                        .join("\n"),
                      {
                        fill: C.tealSoft,
                      }
                    ),

                    cell(
                      (
                        rpp.pemanfaatan_digital ||
                        []
                      )
                        .map(
                          (x, i) =>
                            `${i + 1}. ${x}`
                        )
                        .join("\n"),
                      {
                        fill: C.tealSoft,
                      }
                    ),
                  ],
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 220,
                after: 100,
              },

              children: [
                new TextRun({
                  text:
                    "Kegiatan Pendahuluan",
                  bold: true,
                  color: C.navy,
                  size: 25,
                  font: "Aptos Display",
                }),
              ],
            }),

            ...bulletList(
              rpp.kegiatan_pembuka ||
                []
            ),

            new Paragraph({
              spacing: {
                before: 180,
                after: 100,
              },

              children: [
                new TextRun({
                  text:
                    "Kegiatan Inti",
                  bold: true,
                  color: C.navy,
                  size: 25,
                  font: "Aptos Display",
                }),
              ],
            }),

            ...[
              [
                "Memahami",
                journey.Memahami,
                C.teal,
                C.tealSoft,
              ],

              [
                "Mengaplikasi",
                journey.Mengaplikasi,
                C.navy,
                C.soft,
              ],

              [
                "Merefleksi",
                journey.Merefleksi,
                C.gold,
                C.goldSoft,
              ],
            ].flatMap(
              ([
                phase,
                items,
                accent,
                fill,
              ]) => [
                new Paragraph({
                  spacing: {
                    before: 120,
                    after: 60,
                  },

                  children: [
                    new TextRun({
                      text: phase,
                      bold: true,
                      color: accent,
                      size: 22,
                      font: "Aptos Display",
                    }),
                  ],
                }),

                ...items.map(
                  (x) =>
                    rich(
                      [
                        {
                          text:
                            `${x.label}: `,
                          bold: true,
                        },

                        {
                          text: x.body,
                        },
                      ],
                      {
                        after: 80,
                      }
                    )
                ),
              ]
            ),

            new Paragraph({
              spacing: {
                before: 120,
                after: 80,
              },

              children: [
                new TextRun({
                  text:
                    "Kegiatan Penutup",
                  bold: true,
                  color: C.navy,
                  size: 23,
                  font: "Aptos Display",
                }),
              ],
            }),

            ...bulletList(
              rpp.kegiatan_penutup ||
                []
            ),

            pageBreak(),

            /*
             * =================================================
             * 04 ASESMEN
             * =================================================
             */

            sectionTitle(
              "04",
              "Asesmen & Bukti Belajar",
              "Instrumen yang digunakan untuk melihat proses dan hasil belajar"
            ),

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "Komponen",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                        align:
                          AlignmentType.CENTER,
                      }
                    ),

                    cell(
                      "Bentuk / Teknik",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),

                    cell(
                      "Bukti Belajar",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "Tes Tulis",
                      {
                        bold: true,
                        fill: C.soft,
                      }
                    ),

                    cell(
                      "Pertanyaan formatif",
                      {
                        fill: C.soft,
                      }
                    ),

                    cell(
                      (
                        rpp.asesmen_formatif
                          ?.tes_tulis ||
                        []
                      )
                        .map(
                          (x, i) =>
                            `${i + 1}. ${x}`
                        )
                        .join("\n"),
                      {
                        fill: C.soft,
                      }
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "Observasi",
                      {
                        bold: true,
                      }
                    ),

                    cell(
                      "Observasi partisipasi"
                    ),

                    cell(
                      rpp
                        .asesmen_formatif
                        ?.observasi ||
                        "-"
                    ),
                  ],
                }),

                new TableRow({
                  children: [
                    cell(
                      "Produk",
                      {
                        bold: true,
                        fill: C.soft,
                      }
                    ),

                    cell(
                      "Produk / tugas proyek",
                      {
                        fill: C.soft,
                      }
                    ),

                    cell(
                      rpp
                        .asesmen_formatif
                        ?.produk ||
                        "-",
                      {
                        fill: C.soft,
                      }
                    ),
                  ],
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 220,
                after: 100,
              },

              children: [
                new TextRun({
                  text:
                    "Instrumen Penilaian Diri",
                  bold: true,
                  color: C.navy,
                  size: 25,
                  font: "Aptos Display",
                }),
              ],
            }),

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "No",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                        align:
                          AlignmentType.CENTER,
                      }
                    ),

                    cell(
                      "Indikator",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),

                    ...[1, 2, 3, 4].map(
                      (n) =>
                        cell(
                          String(n),
                          {
                            bold: true,
                            color: C.white,
                            fill: C.navy,
                            align:
                              AlignmentType.CENTER,
                          }
                        )
                    ),
                  ],
                }),

                ...(rpp
                  .indikator_tujuan_pembelajaran ||
                  []
                ).map(
                  (x, i) =>
                    new TableRow({
                      children: [
                        cell(
                          String(i + 1),
                          {
                            align:
                              AlignmentType.CENTER,
                          }
                        ),

                        cell(x),

                        ...[
                          1,
                          2,
                          3,
                          4,
                        ].map(() =>
                          cell("□", {
                            align:
                              AlignmentType.CENTER,
                            size: 22,
                          })
                        ),
                      ],
                    })
                ),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 160,
                after: 50,
              },

              children: [
                new TextRun({
                  text: "Skala: ",
                  bold: true,
                  color: C.navy,
                }),

                new TextRun({
                  text:
                    "1 = Kurang  •  2 = Cukup  •  3 = Baik  •  4 = Sangat Baik",
                  color: C.muted,
                }),
              ],
            }),

            pageBreak(),

            /*
             * =================================================
             * 05 LEMBAR OBSERVASI
             * =================================================
             */

            sectionTitle(
              "05",
              "Lembar Observasi",
              "Bukti keterlibatan murid selama proses pembelajaran"
            ),

            card(
              "PARAMETER PENGAMATAN",
              `Profil Lulusan: ${profilLulusan}\nTopik KBC: ${topikKBC}`,
              C.teal,
              C.tealSoft
            ),

            new Paragraph({
              spacing: {
                before: 180,
                after: 100,
              },

              children: [
                new TextRun({
                  text:
                    "Catatan Observasi",
                  bold: true,
                  color: C.navy,
                  size: 24,
                  font: "Aptos Display",
                }),
              ],
            }),

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "No",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                        align:
                          AlignmentType.CENTER,
                        width: 8,
                      }
                    ),

                    cell(
                      "Nama Murid",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                        width: 28,
                      }
                    ),

                    cell(
                      profilLulusan,
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                        align:
                          AlignmentType.CENTER,
                        width: 32,
                      }
                    ),

                    cell(
                      topikKBC,
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                        align:
                          AlignmentType.CENTER,
                        width: 32,
                      }
                    ),
                  ],
                }),

                ...Array.from({
                  length: 8,
                }).map(
                  (_, i) =>
                    new TableRow({
                      children: [
                        cell(
                          String(i + 1),
                          {
                            align:
                              AlignmentType.CENTER,
                          }
                        ),

                        cell(""),

                        cell(""),

                        cell(""),
                      ],
                    })
                ),
              ],
            }),

            pageBreak(),

            /*
             * =================================================
             * 06 LKPD
             * =================================================
             */

            sectionTitle(
              "06",
              "Lembar Kerja Murid",
              "Ruang kerja untuk memahami, mengaplikasi, dan merefleksi"
            ),

            card(
              "TUJUAN",
              rpp.lembar_kerja
                ?.tujuan || "-",
              C.teal,
              C.tealSoft
            ),

            new Paragraph({
              spacing: {
                before: 150,
                after: 60,
              },

              children: [
                new TextRun({
                  text: "Tugas",
                  bold: true,
                  color: C.navy,
                  size: 23,
                  font: "Aptos Display",
                }),
              ],
            }),

            p(
              rpp.lembar_kerja
                ?.tugas || "-"
            ),

            new Paragraph({
              spacing: {
                before: 100,
                after: 60,
              },

              children: [
                new TextRun({
                  text:
                    "Urutan Kerja",
                  bold: true,
                  color: C.navy,
                  size: 23,
                  font: "Aptos Display",
                }),
              ],
            }),

            p(
              rpp.lembar_kerja
                ?.urutan_kerja || "-"
            ),

            new Paragraph({
              spacing: {
                before: 100,
                after: 60,
              },

              children: [
                new TextRun({
                  text:
                    "Catatan / Temuan Murid",
                  bold: true,
                  color: C.navy,
                  size: 23,
                  font: "Aptos Display",
                }),
              ],
            }),

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "Tahap",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),

                    cell(
                      "Catatan / Temuan",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),
                  ],
                }),

                ...[
                  "Memahami",
                  "Mengaplikasi",
                  "Merefleksi",
                ].map(
                  (x, i) =>
                    new TableRow({
                      children: [
                        cell(
                          x,
                          {
                            bold: true,
                            fill:
                              i === 0
                                ? C.tealSoft
                                : i === 1
                                ? C.soft
                                : C.goldSoft,
                          }
                        ),

                        cell("\n\n"),
                      ],
                    })
                ),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 180,
                after: 70,
              },

              children: [
                new TextRun({
                  text:
                    "Penilaian Diri",
                  bold: true,
                  color: C.navy,
                  size: 23,
                  font: "Aptos Display",
                }),
              ],
            }),

            p(
              rpp.lembar_kerja
                ?.tabel_penilaian_diri
                ?.instruksi ||
                "Isilah tabel penilaian diri berikut, gunakan skala 1–4!",
              {
                italic: true,
                color: C.muted,
              }
            ),

            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },

              rows: [
                new TableRow({
                  children: [
                    cell(
                      "No",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                        align:
                          AlignmentType.CENTER,
                      }
                    ),

                    cell(
                      "Indikator Penilaian",
                      {
                        bold: true,
                        color: C.white,
                        fill: C.navy,
                      }
                    ),

                    ...[
                      1,
                      2,
                      3,
                      4,
                    ].map(
                      (n) =>
                        cell(
                          String(n),
                          {
                            bold: true,
                            color: C.white,
                            fill: C.navy,
                            align:
                              AlignmentType.CENTER,
                          }
                        )
                    ),
                  ],
                }),

                ...(
                  rpp
                    .lembar_kerja
                    ?.tabel_penilaian_diri
                    ?.indikator || []
                ).map(
                  (indic, i) =>
                    new TableRow({
                      children: [
                        cell(
                          String(i + 1),
                          {
                            align:
                              AlignmentType.CENTER,
                          }
                        ),

                        cell(indic),

                        ...[
                          1,
                          2,
                          3,
                          4,
                        ].map(() =>
                          cell("□", {
                            align:
                              AlignmentType.CENTER,
                            size: 22,
                          })
                        ),
                      ],
                    })
                ),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 170,
                after: 0,
              },

              children: [
                new TextRun({
                  text:
                    "Refleksi Singkat: ",
                  bold: true,
                  color: C.navy,
                }),

                new TextRun({
                  text:
                    "Apa hal penting yang saya pahami hari ini? Apa yang masih perlu saya pelajari?",
                  color: C.ink,
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 80,
                after: 0,
              },

              children: [
                new TextRun({
                  text:
                    "________________________________________________________________________________",
                  color: C.muted,
                }),
              ],
            }),

            new Paragraph({
              spacing: {
                before: 80,
                after: 0,
              },

              children: [
                new TextRun({
                  text:
                    "________________________________________________________________________________",
                  color: C.muted,
                }),
              ],
            }),
          ],
        },
      ],
    });

    /*
     * =====================================================
     * GENERATE DOCX
     * =====================================================
     */

    const buffer =
      await Packer.toBuffer(doc);

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="RPP_Integrasi_PM_KBC_Modern.docx"'
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    res.send(buffer);

  } catch (error) {

    console.error(
      "exportWord error:",
      error
    );

    res.status(500).json({
      message:
        "Gagal membuat dokumen Word",
      error: error.message,
    });
  }
};