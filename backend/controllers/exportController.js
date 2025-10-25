// controllers/exportController.js
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageOrientation,
} from "docx";

export const exportWord = async (req, res) => {
  try {
    const rpp = req.body;

    const heading = (text) =>
      new Paragraph({
        text,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 120, after: 150 }, // ≈ 6 pt before
      });

    const doc = new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Cambria",
              size: 24, // 12pt
            },
            paragraph: {
              spacing: { line: 360 }, // 1.5 line spacing
            },
          },
        },
        paragraphStyles: [
          {
            id: "Title",
            name: "Title",
            basedOn: "Normal",
            next: "Normal",
            run: {
              bold: true,
              font: "Cambria",
              size: 28, // 14pt
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            },
          },
          {
            id: "Heading1",
            name: "Heading 1",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              bold: true,
              font: "Cambria",
              size: 26, // 13pt
            },
            paragraph: {
              spacing: { before: 120, after: 150 },
            },
          },
        ],
      },

      sections: [
        // ======================== HALAMAN UTAMA ========================
        {
          properties: {
            page: {
              size: {
                orientation: PageOrientation.PORTRAIT,
                width: 11906,
                height: 16838,
              },
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: [
            new Paragraph({
              text: "Rencana Pelaksanaan Pembelajaran (RPP)",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
            }),

            heading("Identitas"),
            ...Object.entries(rpp.identitas || {}).map(
              ([k, v]) =>
                new Paragraph({
                  spacing: { after: 100 },
                  tabStops: [{ type: "left", position: 4000 }],
                  children: [
                    new TextRun({
                      text: `${k.replaceAll("_", " ")}:\t`,
                      bold: true,
                    }),
                    new TextRun({ text: v }),
                  ],
                })
            ),

            heading("Capaian Pembelajaran"),
            new Paragraph({ text: rpp.capaian_pembelajaran || "" }),

            heading("Tujuan Pembelajaran"),
            ...(rpp.tujuan_pembelajaran || []).map(
              (t) =>
                new Paragraph({
                  text: t,
                  bullet: { level: 0 },
                })
            ),

            heading("Indikator Tujuan Pembelajaran"),
            ...(rpp.indikator_tujuan_pembelajaran || []).map(
              (t) =>
                new Paragraph({
                  text: t,
                  bullet: { level: 0 },
                })
            ),

            heading("Materi Insersi KBC"),
            new Paragraph({ text: rpp.materi_insersi_KBC || "" }),

            heading("Praktek Pedagogik"),
            new Paragraph({ text: rpp.praktek_pedagogik?.model || "" }),

            heading("Lingkungan Pembelajaran"),
            ...(rpp.lingkungan_pembelajaran || []).map(
              (x) => new Paragraph({ text: x, bullet: { level: 0 } })
            ),

            heading("Mitra Pembelajaran"),
            ...(rpp.mitra_pembelajaran || []).map(
              (x) => new Paragraph({ text: x, bullet: { level: 0 } })
            ),

            heading("Pemanfaatan Digital"),
            ...(rpp.pemanfaatan_digital || []).map(
              (x) => new Paragraph({ text: x, bullet: { level: 0 } })
            ),

            heading("Langkah Pembelajaran"),
            ...(rpp.langkah_pembelajaran || []).map((x) =>
              x.startsWith("**")
                ? new Paragraph({
                    text: x.replace(/\*\*/g, ""),
                    spacing: { before: 200, after: 100 },
                    bold: true,
                  })
                : new Paragraph({
                    text: x,
                    bullet: { level: 0 },
                  })
            ),

            heading("Pengalaman Murid"),
            ...Object.entries(rpp.pengalaman_murid || {}).map(
              ([k, v]) =>
                new Paragraph({
                  children: [
                    new TextRun({ text: `${k}: `, bold: true }),
                    new TextRun({ text: v }),
                  ],
                })
            ),

            heading("Asesmen Formatif"),
            ...Object.entries(rpp.asesmen_formatif || {}).flatMap(([k, v]) => {
              const title = new Paragraph({
                children: [
                  new TextRun({ text: `${k.replaceAll("_", " ")}:`, bold: true }),
                ],
                spacing: { before: 100, after: 50 },
              });

              if (Array.isArray(v)) {
                return [
                  title,
                  ...v.map(
                    (item, idx) =>
                      new Paragraph({
                        text: `${idx + 1}. ${item}`,
                        indent: { left: 720 },
                        spacing: { after: 100 },
                      })
                  ),
                ];
              } else {
                return [title, new Paragraph({ text: v || "", indent: { left: 720 } })];
              }
            }),

            // === R U B R I K   P E N I L A I A N  ===
heading("Rubrik Penilaian"),
new Paragraph({
  text: "Instrumen Penilaian Diri",
  italics: true,
  spacing: { after: 200 },
}),
// Membuat Tabel Rubrik
new Table({
  width: { size: 100, type: "pct" },
  rows: [
    // Header Utama
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: "No", bold: true })],
          rowSpan: 2,
        }),
        new TableCell({
          children: [new Paragraph({ text: "Indikator Penilaian", bold: true })],
          rowSpan: 2,
        }),
        new TableCell({
          children: [new Paragraph({ text: "Hasil Penilaian Diri", bold: true, alignment: AlignmentType.CENTER })],
          columnSpan: 4,
        }),
      ],
    }),
    // Header Skala 1-4
    new TableRow({
      children: ["1", "2", "3", "4"].map(
        (n) =>
          new TableCell({
            children: [new Paragraph({ text: n, alignment: AlignmentType.CENTER })],
          })
      ),
    }),
    // Body tabel berdasarkan indikator_tujuan_pembelajaran
    ...(rpp.indikator_tujuan_pembelajaran || []).map((indikator, i) =>
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: `${i + 1}`, alignment: AlignmentType.CENTER })],
          }),
          new TableCell({
            children: [new Paragraph({ text: indikator })],
          }),
          ...[1, 2, 3, 4].map(() =>
            new TableCell({
              children: [new Paragraph({ text: "" })],
            })
          ),
        ],
      })
    ),
  ],
}),

        // ======================== HALAMAN BARU: LEMBAR KERJA ========================
        {
          properties: {
            page: {
              size: {
                orientation: PageOrientation.PORTRAIT,
                width: 11906,
                height: 16838,
              },
              margin: {
                top: 1440,
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: [
            heading("Lembar Kerja"),
            new Paragraph({
              children: [
                new TextRun({ text: "Tujuan: ", bold: true }),
                new TextRun({ text: rpp.lembar_kerja?.tujuan || "" }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Tugas: ", bold: true }),
                new TextRun({ text: rpp.lembar_kerja?.tugas || "" }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Urutan Kerja: ", bold: true }),
                new TextRun({ text: rpp.lembar_kerja?.urutan_kerja || "" }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Rubrik: ", bold: true }),
                new TextRun({ text: rpp.lembar_kerja?.rubrik || "" }),
              ],
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="RPP_Integrasi_App.docx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.send(buffer);
  } catch (error) {
    console.error("❌ Gagal membuat Word:", error);
    res
      .status(500)
      .json({ message: "Gagal membuat dokumen Word", error: error.message });
  }
};
