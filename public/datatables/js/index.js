$(document).ready(function() {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	document.title='City Project';
	// DataTable initialisation
// 	$('#example').DataTable(
// 		{
// 		"dom": '<"dt-buttons"Bf><"clear"><"clear"><"clear"><lf<t>ip>',
// 			"paging": true,
// 			"autoWidth": true,
// 			"buttons": [
// 				'colvis',
// 				'copyHtml5',
//         'csvHtml5',
// 				'excelHtml5',
//         'pdfHtml5',
// 				'print'
// 			]
// 		}
// 	);
// });

	$('#example').DataTable( {
		dom: '<"wrapper"lBfrtip>',
        buttons: [
			'colvis',
			'excelHtml5',
			'print'
        ]
	} );
} );