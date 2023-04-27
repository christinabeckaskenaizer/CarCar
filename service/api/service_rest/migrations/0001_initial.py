# Generated by Django 4.0.3 on 2023-04-27 18:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Technician',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=20)),
                ('last_name', models.CharField(max_length=20)),
                ('employee_id', models.IntegerField(unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Appointment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('reason', models.TextField(max_length=500)),
                ('status', models.BooleanField(default=False)),
                ('vin', models.CharField(max_length=20)),
                ('customer', models.CharField(max_length=20)),
                ('vip', models.BooleanField(default=False)),
                ('technician', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='appointments', to='service_rest.technician')),
            ],
        ),
    ]
