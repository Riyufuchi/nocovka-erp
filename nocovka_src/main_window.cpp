//==============================================================================
// Author     : riyufuchi
// Created on : 2026-04-15
// Last edit  : 2026-04-15
// Copyright  : Copyright (c) 2026, riyufuchi
//==============================================================================
#include "main_window.h"
#include "./ui_main_window.h"

#include <QFileDialog>
#include <QFile>
#include <QJsonDocument>
#include <QJsonObject>
#include <QStandardItemModel>

MainWindow::MainWindow(QWidget *parent)
	: QMainWindow(parent)
	, ui(new Ui::MainWindow)
{
	ui->setupUi(this);
}

MainWindow::~MainWindow()
{
	delete ui;
}


void MainWindow::on_actionExit_triggered()
{
	QApplication::quit();
}


void MainWindow::on_actionImport_triggered()
{
	QString fileName = QFileDialog::getOpenFileName(
		this,
		"Open JSON",
		"",
		"JSON Files (*.json)"
	);

	if (fileName.isEmpty())
		return;

	QFile file(fileName);
	if (!file.open(QIODevice::ReadOnly))
		return;

	QByteArray data = file.readAll();
	file.close();

	QJsonDocument doc = QJsonDocument::fromJson(data);

	if (!doc.isObject())
		return;

	QJsonObject obj = doc.object();

	QStandardItemModel *model = new QStandardItemModel(this);

	QStringList headers;
	for (auto key : obj.keys())
	{
		headers << key;
	}
	model->setColumnCount(headers.size());
	model->setHorizontalHeaderLabels(headers);

	QList<QStandardItem*> row;

	for (auto key : obj.keys())
	{
		QString value = obj.value(key).toVariant().toString();
		row.append(new QStandardItem(value));
	}

	model->appendRow(row);

	ui->tableView->setModel(model);
}

