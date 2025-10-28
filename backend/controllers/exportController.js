// controllers/exportController.js
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageOrientation,
  Table,
  TableRow,
  TableCell,
} from "docx";

export const exportWord = async (req, res) => {
  try {
    const rpp = req.body;

    const heading = (text) =>
      new Paragraph({
        text,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 120, after: 150 },
      });

    const doc = new Document({
      styles: {
        default: {
          document: { run: { font: "Cambria", size: 24 }, paragraph: { spacing: { line: 360 } } },
        },
        paragraphStyles: [
          {
            id: "Title",
            name: "Title",
            basedOn: "Normal",
            next: "Normal",
            run: { bold: true, font: "Cambria", size: 28 },
            paragraph: { alignment: AlignmentType.CENTER, spacing: { after: 200 } },
          },
        ],
      },

      sections: [
        {
          properties: {
            page: {
              size: { orientation: PageOrientation.PORTRAIT, width: 11906, height: 16838 },
              margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
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
                  children: [new TextRun({ text: `${k.replaceAll("_", " ")}:\t`, bold: true }), new TextRun({ text: v })],
                })
            ),

            heading("Capaian Pembelajaran"),
            new Paragraph({ text: rpp.capaian_pembelajaran || "" }),

            heading("Tujuan Pembelajaran"),
            ...(rpp.tujuan_pembelajaran || []).map((t) => new Paragraph({ text: t, bullet: { level: 0 } })),

            heading("Indikator Tujuan Pembelajaran"),
            ...(rpp.indikator_tujuan_pembelajaran || []).map((t) => new Paragraph({ text: t, bullet: { level: 0 } })),

            heading("Materi Insersi KBC"),
            new Paragraph({ text: rpp.materi_insersi_KBC || "" }),

            heading("Praktek Pedagogik"),
            new Paragraph({ text: rpp.praktek_pedagogik?.model || "" }),

            heading("Lingkungan Pembelajaran"),
            ...(rpp.lingkungan_pembelajaran || []).map((x) => new Paragraph({ text: x, bullet: { level: 0 } })),

            heading("Mitra Pembelajaran"),
            ...(rpp.mitra_pembelajaran || []).map((x) => new Paragraph({ text: x, bullet: { level: 0 } })),

            heading("Pemanfaatan Digital"),
            ...(rpp.pemanfaatan_digital || []).map((x) => new Paragraph({ text: x, bullet: { level: 0 } })),

            heading("Kegiatan Pendahuluan"),
            ...(rpp.kegiatan_pembuka || []).map((x) => new Paragraph({ text: x, bullet: { level: 0 } })),

            heading("Kegiatan Inti"),
            ...(rpp.kegiatan_inti || []).map((x) =>
              x.startsWith("**")
                ? new Paragraph({ text: x.replace(/\*\*/g, ""), spacing: { before: 200, after: 100 }, bold: true })
                : new Paragraph({ text: x, bullet: { level: 0 } })
            ),

            heading("Kegiatan Penutup"),
            ...(rpp.kegiatan_penutup || []).map((x) => new Paragraph({ text: x, bullet: { level: 0 } })),

            heading("Pengalaman Murid"),
            ...Object.entries(rpp.pengalaman_murid || {}).map(([k, v]) => new Paragraph({ children: [new TextRun({ text: `${k}: `, bold: true }), new TextRun({ text: v })] })),

            heading("Asesmen Formatif"),
            ...Object.entries(rpp.asesmen_formatif || {}).flatMap(([k, v]) => {
              const title = new Paragraph({ children: [new TextRun({ text: `${k.replaceAll("_", " ")}:`, bold: true })], spacing: { before: 100, after: 50 } });
              return Array.isArray(v)
                ? [title, ...v.map((item, idx) => new Paragraph({ text: `${idx + 1}. ${item}`, indent: { left: 720 }, spacing: { after: 100 } }))]
                : [title, new Paragraph({ text: v || "", indent: { left: 720 } })];
            }),
          ],
        },

        {
          properties: {
            page: {
              size: { orientation: PageOrientation.PORTRAIT, width: 11906, height: 16838 },
              margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
            },
          },
          children: [
            heading("Lembar Kerja"),
            new Paragraph({ children: [new TextRun({ text: "Tujuan: ", bold: true }), new TextRun({ text: rpp.lembar_kerja?.tujuan || "" })] }),
            new Paragraph({ children: [new TextRun({ text: "Tugas: ", bold: true }), new TextRun({ text: rpp.lembar_kerja?.tugas || "" })] }),
            new Paragraph({ children: [new TextRun({ text: "Urutan Kerja: ", bold: true }), new TextRun({ text: rpp.lembar_kerja?.urutan_kerja || "" })] }),
            new Paragraph({ children: [new TextRun({ text: "Rubrik: ", bold: true }), new TextRun({ text: rpp.lembar_kerja?.rubrik || "" })], spacing: { after: 150 } }),

            ...(rpp.lembar_kerja?.tabel_penilaian_diri?.indikator?.length
              ? [
                  new Paragraph({ text: rpp.lembar_kerja.tabel_penilaian_diri.instruksi || "", spacing: { before: 200, after: 150 } }),
                  new Table({
                    width: { size: 100, type: "pct" },
                    rows: [
                      new TableRow({
                        children: [
                          new TableCell({ children: [new Paragraph({ text: "No", alignment: AlignmentType.CENTER, bold: true })], rowSpan: 2 }),
                          new TableCell({ children: [new Paragraph({ text: "Indikator Penilaian", bold: true })], rowSpan: 2 }),
                          new TableCell({
                            children: [new Paragraph({ text: "Hasil Penilaian Diri", bold: true, alignment: AlignmentType.CENTER })],
                            columnSpan: 4,
                          }),
                        ],
                      }),
                      new TableRow({ children: ["1", "2", "3", "4"].map((n) => new TableCell({ children: [new Paragraph({ text: n, alignment: AlignmentType.CENTER })] })) }),
                      ...rpp.lembar_kerja.tabel_penilaian_diri.indikator.map((indic, i) =>
                        new TableRow({
                          children: [
                            new TableCell({ children: [new Paragraph({ text: `${i + 1}`, alignment: AlignmentType.CENTER })] }),
                            new TableCell({ children: [new Paragraph({ text: indic })] }),
                            ...[1, 2, 3, 4].map(() => new TableCell({ children: [new Paragraph({ text: "" })] })),
                          ],
                        })
                      ),
                    ],
                  }),
                ]
              : []),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    res.setHeader("Content-Disposition", 'attachment; filename="RPP_Integrasi_App.docx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat dokumen Word", error: error.message });
  }
};
